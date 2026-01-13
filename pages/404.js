import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [router]);
  return (
    <>
        <main className="custom-pad">
          <div className="container">
            <div className="mar-top-lg">
              <div className="row">
                <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                  <div className="page-content text-center">
                    <h1 className="bangla">৪০৪!</h1>
                    <p className="lead bangla">দুঃখিত, এই পৃষ্ঠাটি পাওয়া যায়নি।</p>
                    <h2 className="bangla">
                      <Link href="/">হোমপেজে ফিরে যান</Link>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
    </>
  );
};

export default NotFound;
