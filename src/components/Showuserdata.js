import React,{useState,useEffect} from "react";

import MaterialTable from "material-table";

export const Showuserdata = ({users}) => {

  const [tableData,setTableData] = useState([]);
  const GetUsers = async () => {
       
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
            setTableData(await response.json());
       
    }
    
     
      useEffect(() => {
        GetUsers();
    }, []);


const columns = [
  {title:"Name",field:"name"},
  {title:"Username",field:"username"},
  {title:"Email",field:"email"},
  {title:"phone Number",field:"phone",align:"center"},
{title:"Website",field:"website"},
  
]

    return (
         <MaterialTable columns ={columns} data={tableData} 
     
        editable={{
         onRowAdd:(newRow)=> new Promise((resolve,reject)=>{
             setTableData([...tableData,newRow])
             setTimeout(()=> resolve(),500)
         }),
         onRowUpdate:(newRow,oldRow)=>new Promise((resolve,reject)=>{
           const updatedData =[...tableData]
           updatedData=[oldRow.tableData.id]=newRow
           setTableData(updatedData)
            setTimeout(()=> resolve(),500)
         }),
       
        onRowDelete:(selectedRow)=>new Promise((resolve,reject)=>{
          const updatedData = [...tableData]
          updatedData.splice(selectedRow.tableData.id,1)
          setTableData(updatedData)
           setTimeout(()=> resolve(),500)
        }),
        }}
        options={{paging:false,actionsColumnIndex:-1}}
        />
        
    )
}
