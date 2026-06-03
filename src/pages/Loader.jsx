import React from "react";

export default function Loader() {
  return (
    <div
      className="d-flex py-3 justify-content-center align-items-center "
      
    >
      <div
        className="loader-box text-center"
        style={{
          padding: "40px 50px",
          background: "white",
          borderRadius: "20px",
          boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* ICON */}
       

        {/* TEXT + DOTS */}
        <h4 className=" fw-bold d-flex flex-column gap-2 mt-3 d-flex flex-column">
             <span className="loading-dots">
             <span className="box bg-primary box1"></span>
             <span className="box bg-primary box2"></span>
             <span className="box bg-primary box3"></span>
          </span>
          Loading
         
        </h4>

        <p className=" fw-bold text-muted m-0">Please wait a moment</p>
      </div>

      <style>{`
       
       

        

        /* DOTS ANIMATION */
        .loading-dots {
          display:flex;
          justify-content:center;
          gap:5px
          margin-left:10px;
          
        }
       
        .box {
          opacity: 0;
          animation: blink 1.4s infinite;
          width:30px;
          height:40px;
          margin-left:5px;         
          
        }

        .box1 { animation-delay: 0s; }
        .box2 { animation-delay: 0.3s; }
        .box3 { animation-delay: 0.6s; }

        @keyframes blink {
          0% { opacity: 0; }
          30% { opacity: 1; }
          60% { opacity: 0; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
