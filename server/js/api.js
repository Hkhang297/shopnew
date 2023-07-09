const urlServer = `http://localhost:8080`;

const apiTivi=()=>{
    let http=new XMLHttpRequest(); // Trình duyệt 
    let thamso="dsTivi";
    http.open("GET",`${urlServer}/${thamso}`,false);// Đồng bộ
    http.send();
    let strJson=http.responseText;
    return JSON.parse(strJson);
}

const apiCuahang=()=>{
    let http=new XMLHttpRequest(); // Trình duyệt 
    let thamso="Cuahang";
    http.open("GET",`${urlServer}/${thamso}`,false);// Đồng bộ
    http.send();
    let strJson=http.responseText;
    return JSON.parse(strJson);
}

const apiThemNguoidung=(objUser)=>{
    let http=new XMLHttpRequest(); // Trình duyệt 
    let thamso="ThemNguoidung";
    http.open("POST",`${urlServer}/${thamso}`,false);// Đồng bộ
    // Gởi dữ liệu về Server (JSON)
    http.send(JSON.stringify(objUser));
    // Nhận Dữ liệu JSON từ Server gởi về
    let strJson=http.responseText;

    return JSON.parse(strJson);
}
