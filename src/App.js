import { useEffect , useState} from 'react';
import './App.css';
import 'antd/dist/antd.css'
import { Table} from 'antd';
import { useHistory } from 'react-router-dom'
import { AiFillGithub } from "react-icons/ai";

function App() {
  const history = useHistory()
  const [gitdata , setgitdata] = useState([]);
  const [repos,setRepos] = useState([])
  const [username,setUsername] = useState('')
  const [show,setShow] = useState(false)

  useEffect(()=>{
    fetch("https://api.github.com/users")
    .then(res=>res.json())
    .then(data=>{
      setgitdata(data)
      console.log(data)
    })
  },[])

  const showRepo = (repourl,username) => {
    // alert(repourl)
    setUsername(username)
    setShow(true)
    fetch(repourl)
    .then(res=>res.json())
    .then(data=>{
      setRepos(data)
      console.log("sshhsh",data)
    })
  }


  const columns = [
    {
      title:"Repository Id",
      dataIndex:"id"
    },
    {
      title:"Repository Name",
      dataIndex:"name"
    },
    {
      title:"Repository Stars",
      dataIndex:"stargazers_count"
    },
    {
      title:"Repository Forks",
      dataIndex:"forks"
    }
  ]

  return (
    <>
    <h1 style={{textAlign:"center"}}>JAI SHREE KRISHNA</h1>
    <h3 style={{textAlign:"center",color:"#5061b7"}}>Click on any Github User to see his Stats</h3>
    <h5 className='mt-2' style={{textAlign:"center"}}>{show?"You are viewing Stats of user :":""}&nbsp;{username}</h5>
    <div className='container mt-4'>
      <Table className="tables"
      dataSource={repos}
      columns={columns}
      ></Table>
    </div>
    {
      gitdata.map((item)=>{
        return (
          <div className='repos'>
            <span className='' style={{color:"#4c413a"}} onClick={()=>showRepo(item.repos_url , item.login)}><AiFillGithub style={{fontSize:20}}/>&nbsp;{item.login}</span>
          </div>
          
        )
      })
    }
    <h5 className='mt-2' style={{textAlign:"center"}}>{show?"You are viewing Stats of user :":""}&nbsp;{username}</h5>
    <div className='container mt-4'>
      <Table className="tables"
      dataSource={repos}
      columns={columns}
      ></Table>
    </div>
    </>
  );
}

export default App;
