import ListService from "./ListService.js";
import List from "./List.js";
const service = new ListService();
const getEle = (id) => document.getElementById(id);

const renderToDo = (list) => {
 let content = "";
 list.filter(task => task.complete === false).forEach((item) =>{
     content +=`
          <li>
               ${item.text}
               <div>
               <button type="button"onclick="hoanthanh(${item.id})">
                <span><i class="fa fa-check-circle"></i></span>
               </button>
               <button onclick="Delete(${item.id})"><i class="far fa-trash-alt"></i></button>
               </div>
          </li>
     `;
 });
 getEle("todo").innerHTML = content;
}
const ListData = ()=>{
      service.callApi("demo","GET",null)
      .then((result) => {
          console.log(result.data);
          renderToDo(result.data);
          renderCompleted(result.data);
      })
      .catch((error) => {
          console.log(error);
      })
}


ListData();

const AddList = () => {
    const text = getEle("newTask").value;
    let list = new List(text,'');
    service.callApi("demo","POST",list)
    .then(() => {
        ListData();
        alert("add success");
    })
    .catch((error) => {
        console.log(error);
    })
    if(text === ""){
        alert("vui lòng không bỏ trống");
        return false;
    } else{
        const complete = false;
        const work = new List(text,"",complete);
        return work;
    }
}; 
//khai báo addlist vào đối tượng window
window.AddList = AddList;
// xóa
const Delete = (id) => {
    service.callApi(`demo/${id}`,"DELETE",null)
    .then(() => {
        ListData();
        alert("delete success");  
    })
    .catch((error) => {
        console.log(error);
    })
    
}
window.Delete = Delete;

// tick
const list = [];
const hoanthanh = (id) => {
    service.callApi(`demo/${id}`,"GET",null)
    .then((result) => {
        console.log(result.data);
        let data = {...result.data, complete : true}
        service.callApi(`demo/${id}`,"PUT",data)
         .then(() => {
            ListData();
         })
    })
    .catch((error) => {
        console.log(error);
    }) 
}
window.hoanthanh = hoanthanh;   

const renderCompleted = (list) => {
    let content = "";
    list.filter(task => task.complete === true).forEach((item)=>{
        content +=`
         
             <li>
                  ${item.text}
                  <div>
                  <button type="button"onclick="hoanthanh(${item.id})">
                   <span><i class="fa fa-check-circle"></i></span>
                  </button>
                  <button onclick="Delete(${item.id})"><i class="far fa-trash-alt"></i></button>
                  </div>
             </li>
        `;
    });
    getEle("completed").innerHTML = content;
}



