import useFetchList from "../../hooks/crud/use-fetch-list"

function Crud() {

    const { data, loading, error } = useFetchList("tasks");
    console.log("data",data,loading,error);
    

  return (
    <div>
      ddewqe
    </div>
  )
}

export default Crud
