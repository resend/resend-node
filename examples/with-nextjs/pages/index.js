export default function Index() {
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const req = await fetch('/api/send');
      const data = await req.json();
      console.log(data);
    }
    catch(e) {
      console.error(e);
    }
  }

  return <form onSubmit={onSubmit}>
    <button type="submit">Send Email</button>
  </form>
}
