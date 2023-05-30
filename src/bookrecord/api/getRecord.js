const toJson = async (res) => {
    const json = await res.json();
    if(res.ok){
        return json;
    }else{
        throw new Error(json.message);
    }
}


const getBookList = async () => {
    const res = await fetch('http://127.0.0.1:8000/bookrecord/booklist/', {
      method: 'GET',
    });
    return await toJson(res);
  };

export {getBookList};

const getBookDetail = async(id) => {
    const res = await fetch(
        // daily/<int:pk>はReactだとこうなる
    `http://127.0.0.1:8000/bookrecord/book/${id}/`, {
        method: 'GET',
    })
  return await toJson(res);
}
export {getBookDetail}


const getFolderList = async() => {
    const res = await fetch(
        'http://127.0.0.1:8000/bookrecord/folder/' , {
            method: 'GET',
    })
    return await toJson(res); 
}

export {getFolderList}



const getFolder =  async(id) => {
    const res = await fetch(
    `http://127.0.0.1:8000/bookrecord/folder/${id}/`, {
        method: 'GET',
    })
  return await toJson(res);
}

export {getFolder}


const getDateList = async() => {
    const res = await fetch(
        'http://127.0.0.1:8000/bookrecord/dates/' , {
            method: 'GET',
    })
    return await toJson(res); 
}

export {getDateList}


const getDate = async(date) => {
    const res = await fetch(
    `http://localhost:8000/bookrecord/book/${date}/` , {
        method : 'GET',
    })
    return await toJson(res);
}

export {getDate}


