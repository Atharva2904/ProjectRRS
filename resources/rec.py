from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from nltk.corpus import stopwords
import json
import re
import spacy
import pandas as pd
from pathlib import Path

app = Flask(__name__)
CORS(app, resources={r"/search": {"origins": "http://localhost:3000"}, r"/userinterests" : {"origins": "http://localhost:3000"}})

# Load necessary resources
stopList = set(stopwords.words("english"))
nlp = spacy.load("en_core_web_sm")
tfidf1 = TfidfVectorizer()
wordvectorizer = CountVectorizer(ngram_range=(1, 2))


BASE_DIR = Path(__file__).resolve().parent

DATA_FILE = BASE_DIR / 'resources' / 'tengen2.csv'
TAG_FILE = BASE_DIR / 'resources' / 'tag2.json'
NOT_FOUND_FILE = BASE_DIR / 'resources' / 'notFound.json'
REC_FILE = BASE_DIR / 'resources' / 'rec.json'

# Load data and prepare functions
def load_data():

    print(f"Tengen DataFrame Path: {DATA_FILE}")
    print(f"Tags Path: {TAG_FILE}")

    global tengen_df
    global similarity_df
    global custom_keywords
    global lowered

    # Load DataFrame

    # tengen_df = pd.read_csv(r'C:\SEM5\tempWorkspace\apurvinho\resources\tengen2.csv')
    tengen_df = pd.read_csv(r'C:\SEM5\tempWorkspace\apurvinho\resources\updated_books_dataset.csv')
    # tengen_df = pd.read_csv(DATA_FILE)
    
    # Read and process custom keywords
    custom_keywords = read_tags_json(r"C:\SEM5\tempWorkspace\apurvinho\resources\tag2.json")

    # custom_keywords = read_tags_json(TAG_FILE)

    lowered = {
        k.lower(): [v.lower() for v in values] for k, values in custom_keywords.items()
    }
    
    # Vectorize data
    similarity_df = vectorize(tengen_df)

def read_tags_json(file_path):
    with open(file_path, "r") as file:
        data = json.load(file)
    return data

def vectorize(krc_df):
    tfidf_matrix = tfidf1.fit_transform(krc_df["combo"])
    cosine_matrix = cosine_similarity(tfidf_matrix)
    similarity_df = pd.DataFrame(
        cosine_matrix, index=krc_df["Title"], columns=krc_df["Title"]
    )
    return similarity_df

def categorize_ngrams(text: str):
    try:
        text = re.sub(r"[cC]\s*\#", "csharp", text)
        text = re.sub(r"[cC]\s*\+\s*\+\s*", "cplusplus", text)
        text = text.lower()
        text = re.sub(r"[^\x00-\x7F]+", "", text)  # Remove non-ASCII characters
        text = re.sub(r"[^\w\s]", "", text)  # Remove punctuation

        doc = nlp(text)
        filtered_words = [
            token.text
            for token in doc
            if token.tag_
            not in ("CCONJ", "ADP", "SPACE", "DET", "PRON", "AUX", "SCONJ")
            and token.text not in stopList
        ]
        filtered_text = " ".join(filtered_words)

        x = wordvectorizer.fit_transform([filtered_text])
        found_tags = wordvectorizer.get_feature_names_out()
        new_tags = []
        for key in lowered:
            keywords = set(lowered[key])
            similar_tags = set(found_tags)
            if len(keywords.intersection(similar_tags)) > 0:
                new_tags.append(key)

        if not new_tags:
            new_tags.append("unknown")

        return new_tags

    except Exception as e:
        return ["unknown"]

# Run the initialization function before handling requests
load_data()


def normalize_df(df):
    return df.subtract(df.mean(axis=1), axis=0)


@app.route('/search', methods=['POST'])   
def recommend():
    try:
        global similarity_df
        recommendations = []
        data = request.get_json()
        # print(data)
        search_query = data.get('query')
        if not search_query:
            return jsonify({'message': data}), 400
        
        search_query = search_query.strip()

        if search_query in similarity_df.index:
            book_index = similarity_df.index.get_loc(search_query)
            rec = similarity_df.iloc[book_index].sort_values(ascending=False)[0:20]
        else:
            tags = categorize_ngrams(search_query)
            temp = " ".join(tags)

            notfound_query = {
                "Title": search_query,
                "mycategories": temp,
                "combo": search_query + " " + temp,
            }
            newDoc = pd.DataFrame([notfound_query])
            tengen_df_1 = pd.concat([tengen_df, newDoc], ignore_index=True)

            temp1 = vectorize(tengen_df_1)

            with open(r"C:\SEM5\tempWorkspace\apurvinho\resources\notFound.json", "w") as file:
            # with open(NOT_FOUND_FILE, "w") as file:
                json.dump(notfound_query, file, indent=1)

            similarity_df = temp1

        if search_query in similarity_df.index:
            book_index = similarity_df.index.get_loc(search_query)
            rec = similarity_df.iloc[book_index].sort_values(ascending=False)[1:20]
            for value in rec.index:
                books = {}
                index = tengen_df.loc[tengen_df["Title"] == value].index[0]
                # books['Title'] = value if value else 'null'
                # books['Index'] = int(index) if index else 0
                # books['Author'] = tengen_df.loc[index, "Author"] if tengen_df.loc[index, 'Author'] else 'null'
                # books['Count'] = tengen_df.loc[index, "count"] if tengen_df.loc[index, "count"] else 0
                # books['Categories'] = tengen_df.loc[index, "mycategories"] if tengen_df.loc[index, "mycategories"] else 'null'
                # books['Rating'] = tengen_df.loc[index, 'Rating'] if tengen_df.loc[index, 'Rating'] else 'null'
                # books['Image'] = tengen_df.loc[index, 'Thumbnail'] if tengen_df.loc[index, 'Thumbnail'] else 'null'

                value = value.replace('cplusplus', 'C++')
                value = value.replace('csharp', 'C#')

                cats = tengen_df.loc[index, "mycategories"]

                cats = cats.replace('cplusplus', 'C++')
                cats = cats.replace('csharp', 'C#')

                books["Title"] = value
                books["Index"] = int(index)
                books["Author"] = tengen_df.loc[index, "Author"]
                books["Count"] = int(tengen_df.loc[index, "count"])
                books["Categories"] = cats
                books["Rating"] = round(tengen_df.loc[index, 'Rating'],2)

                if tengen_df.loc[index, 'Thumbnail'] == "" or pd.isna(tengen_df.loc[index, 'Thumbnail']):
                    # books['Thumbnail_Path'] = f'C:/SEM5/tempWorkspace/apurvinho/public/cpp.jpeg'
                    initial = books['Title'][0]
                    books['Thumbnail_Path'] = f'{initial.upper()}.jpeg'
                else:
                    bookindex = tengen_df.loc[index, 'BookIndex']
                    books['Thumbnail_Path'] = f'{bookindex}.jpg'

                # books['Image'] = tengen_df.loc[index, 'Thumbnail'] if tengen_df.loc[index, 'Thumbnail'] else 'null'

                # print(books)
                recommendations.append(books)

            recommendations.sort(key=lambda x: x['Rating'], reverse=True)
            with open(r"C:\SEM5\tempWorkspace\apurvinho\resources\rec.json", "w") as recFile:
            # with open(REC_FILE, "w") as recFile:
                json.dump(recommendations, recFile, indent=1)

            return jsonify({'recommended': recommendations})
        else:
            return jsonify({'message': 'No recommendations found'}), 404

    except Exception as e:
        print(f"Error in recommend: {e}")
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500


@app.route('/userinterests', methods=['POST'])
def trigger_user_recommender():
    try:
        data = request.get_json()
        userID = data.get('userid')

        if not userID:
            return jsonify({'message' : data}), 400
        
        user_activity_df = pd.read_csv(r'C:\SEM5\tempWorkspace\apurvinho\resources\user_int.csv')

        mypt = user_activity_df.pivot_table(index='newTag', columns='User', values='total', fill_value=0)

        normalized_df = normalize_df(mypt)

        SIMILARITY_MATRIX = cosine_similarity(normalized_df.T)
        user_similarity_df = pd.DataFrame(SIMILARITY_MATRIX, index=mypt.columns, columns=mypt.columns )


        # Computing top 3 tags for this user based on user interaction table

        similar_users = user_similarity_df[userID].sort_values(ascending=False).index[1:]

        tag_scores = normalized_df[similar_users].sum(axis=1).sort_values(ascending=False)

        recommended_tags = tag_scores.index.tolist()
        recommended_tags = list(reversed(recommended_tags))
        query = {
            'userid' : userID,
            'user_rec' : recommended_tags
        }

        return jsonify(query)
    




    except Exception as e:
        print(f"Error in user recommender: {e}")
        return jsonify({'message' : 'An error occured in collaborative filtering', 'error': str(e)}), 500
    


if __name__ == "__main__":
    print('Flask App is running')
    app.run(host='127.0.0.1', port=5000, debug=True)
