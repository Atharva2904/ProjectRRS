import { Quicksand, Work_Sans } from 'next/font/google';
const workSans = Work_Sans({ weight: "500", subsets: ["latin"] });
const qs = Quicksand({ weight: "700", subsets: ["latin"] });
export default function Loading() {
  return(
  // You can add any UI inside Loading, including a Skeleton.
  <div className=" loading-overlay justify-center text-center mx-auto p-4 " >
     <div className="loader"></div>
     <span class="loading-text">Loading, please wait...</span>
  </div>
  );
}