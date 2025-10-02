const { useState } = React;

function UserForm() {
  const [data, setData] = useState({ name:'', uid:'', gender:'', submitted:false });

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    console.log('Form Data:', data);
    setData(prev => ({ ...prev, submitted:true }));
    setTimeout(() => setData(prev => ({ ...prev, submitted:false })), 3000);
  }

  return (
    <div className="container">
      <h1>User Form</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={data.name} onChange={handleChange} required/>
        <input type="text" name="uid" placeholder="UID" value={data.uid} onChange={handleChange} required/>
        <div>
          {['male','female','other'].map(g => (
            <label key={g}>
              <input type="radio" name="gender" value={g} checked={data.gender===g} onChange={handleChange}/> {g.charAt(0).toUpperCase()+g.slice(1)}
            </label>
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
      {data.submitted && <div className="success"> Submitted!</div>}
      <div className="result">
        <p>Name: {data.name||'-'}</p>
        <p>UID: {data.uid||'-'}</p>
        <p>Gender: {data.gender||'-'}</p>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<UserForm />);
