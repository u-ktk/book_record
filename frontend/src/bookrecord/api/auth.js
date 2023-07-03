// JWTアクセストークンの取得


const toJson = async (res) => {
    const json = await res.json();
    if(res.ok){
        return json;
    }else{
        throw new Error(json.message);
    }
}

const auth = async () => {
  // fetchに失敗するのはなぜ？
    const res = await fetch('http://127.0.0.1:8000/authen/jwt/create/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
    }
    );
    console.log(res);
    return await toJson(res);
  };

// import axios from "axios";
// const auth = async () => {
//   const res = await axios.post('http://127.0.0.1:8000/authen/jwt/create/',  {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   return res.data;
  
// }

export {auth};

