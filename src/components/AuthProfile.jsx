import { useAuth0 } from "@auth0/auth0-react"


const AuthProfile = () => {
  const { user, getAccessTokenSilently } = useAuth0();

  const fetchProtectedData = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get("http://localhost:4000/api/protected", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  return (
    <div>
      <h2>Welcome, {user?.name}</h2>
      <button onClick={fetchProtectedData}>Fetch Protected Data</button>
    </div>

    )
}

export default withAuthenticationRequired(AuthProfile)

