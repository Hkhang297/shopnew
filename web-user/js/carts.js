let carts = [];
/* 
maNhom 
1 tivi
2 food
3 mobile
*/
const addCart = (maSo, maNhom) => {
    getCollection(Number(maNhom)).then(result => {
        let id = maSo;
        let sl = Number(document.querySelector(`#sl${id}`).value)
        let vt = -1;
        if (sessionStorage.getItem("carts") != undefined) {
            carts = JSON.parse(sessionStorage.getItem("carts"))
            vt = carts.findIndex(item => item.maso == id);
        }

        if (vt == -1) {
            let tmp = result.find(x => x.Ma_so == id);
            let cart = {
                maso: id,
                soluong: sl,
                ten: tmp.Ten,
                dongiaban: Number(tmp.Don_gia_Ban),
                manhom:maNhom
            }
            carts.push(cart)
        } else {
            carts[vt].soluong += sl 
        }

        if (carts.length > 0) {
            sessionStorage.setItem("carts", JSON.stringify(carts))
        } else {
            sessionStorage.removeItem("carts")
        }
        document.getElementById("Th_Giohang").innerHTML = carts.length
    })

}

const getCollection = async (maNhom) => {
    let ds = []
    if (maNhom == 1) {
        ds = await apiTivi();
    } else if (maNhom == 2) {
        ds = await apiMathang();
    } else {
        ds = await apiDienthoai();
    }
    return ds;
}

const openCart = () => {
    if (sessionStorage.getItem("carts") != undefined) {
        window.location = `/web/cart/`
    }
}

//===========================================================
const Xuat_San_Pham_Mua = (carts, Th_Cha) => {
    Th_Cha.innerHTML = ""
    let noi_dung_HTML = ``
    carts.forEach(item => {
        let thanhTien = item.soluong * item.dongiaban
        noi_dung_HTML += `
        <tr>
            <td scope="row" class="text-center">
                <img src=${urlImage}/${item.maso}.png style="width:80px" />
            </td >
            <td class="text-center">${item.ten}</td>
            <td class="text-center">
                <input onchange="soLuong('${item.maso}',this)" type="number" min="1" max="10" value="${item.soluong}" class="text-right" />
            </td>
            <td class="text-center">${item.dongiaban.toLocaleString()}<sup>đ</sup></td>
            <td id="tt${item.maso}" class="text-center" >${thanhTien.toLocaleString()}<sup>đ</sup></td>
            <td class='xoa text-center' onclick="xoaGiohang('${item.maso}')"> Xóa </td>
        </tr >
        `
    })
    noi_dung_HTML += `
        <tr>
                <td colspan="6" id="Th_Tong" style="text-align: right;" class="h3" ></td>
                
        </tr>
    `
    Th_Cha.innerHTML = noi_dung_HTML
    tongThanhtien()

}

const soLuong=(Ma_so,input)=>{
    carts=JSON.parse(sessionStorage.getItem('carts'));
    let item=carts.find(x=>x.maso==Ma_so);
    item.soluong=Number(input.value);
    let thanhTien= item.soluong* item.dongiaban;
    document.getElementById(`tt${Ma_so}`).innerHTML=`${thanhTien.toLocaleString()}<sup>đ</sup>` // Hiển thị thành tiền
    sessionStorage.setItem('carts',JSON.stringify(carts));
    tongThanhtien() 
}

const tongThanhtien = () => {
    let kq = 0
    carts = JSON.parse(sessionStorage.getItem("carts"))
    carts.forEach(dt => {
        kq += dt.soluong * dt.dongiaban
    })
    Th_Tong.innerHTML = `<strong>Tổng thành tiền:</strong> ${kq.toLocaleString()}<sup>đ</sup>`
}

const xoaGiohang=(Ma_so)=>{
    carts=JSON.parse(sessionStorage.getItem('carts'));
    let vt=carts.findIndex(x=>x.maso==Ma_so);
    carts.splice(vt,1);
    if(carts.length==0){
        Th_XoaCarts.click()
    }else{
        sessionStorage.setItem('carts',JSON.stringify(carts));
        Xuat_San_Pham_Mua(carts, Th_Carts) 
    }
}

const datHang = () => {
    let dsDonHang=[]
    carts = JSON.parse(sessionStorage.getItem("carts"));
    let Khach_hang = {
        "Ho_ten": document.querySelector("#Th_Ho_ten").value,
        "Dien_thoai": document.querySelector("#Th_Dien_thoai").value,
        "Email": document.querySelector("#Th_Email").value,
        "Dia_chi": document.querySelector("#Th_Dia_chi").value
    }
    carts.forEach(item=>{
        let donDathang = {
            "Ngay_Dat_hang": new Date(),
            "Ngay_Giao_hang": document.querySelector("#Th_Ngay_Giao_hang").value,
            "So_luong": Number(item.soluong),
            "Don_gia_Ban": Number(item.dongiaban),
            "Tien": Number(item.soluong)*Number(item.dongiaban),
            "Trang_thai": "CHUA_GIAO_HANG",
            "Khach_hang": Khach_hang
        };
        let maso=item.maso;
        let manhom=item.manhom;
        let donhang={
            key:maso,
            manhom:manhom,
            dathang:donDathang
        }
        dsDonHang.push(donhang)
        console.log(dsDonHang);
    })

    apiDathang(dsDonHang).then(result=>{
        console.log(result);
        alert('Đơn đặt hàng thành công...')
        Th_XoaCarts.click();
    }).catch(err=>{
        console.log(err);
    })
    
    
}