import { useEffect } from "react";

const useScript = (url:string, dataKey:any) => {
useEffect(() => {
    const script:any = document.createElement("script");
    // const oldscript:any = document.getElementsByTagName("script");
     
    // let firstSkip=1;
    // for (const key in oldscript) {
    //     if (oldscript.hasOwnProperty(key)) {
    
    //         console.log(oldscript[key].src);
    //         if (oldscript[key].src === 'http://localhost:3000/assets/js/main.min.js') {
    //             console.log("remove child")
    //             if(firstSkip == 1)
    //             {
    //                 firstSkip = 2
    //             }else{
      

    //                 oldscript[key].parentNode.remove();
    //             }
    //           }
    //     }
    // }

    script.src = url;
    script["data-key"] = dataKey;
    script["data-lang"] = "en";
    script["data-write-log"] = true;
    script.async = true;

    document.body.appendChild(script);

    return () => { document.body.removeChild(script);};
    }, [url]);
  };

  export default useScript;