const { setSuggestedUsers } = require("@/redux/authSlice");
const { useEffect } = require("react");
const { useDispatch } = require("react-redux")

const useSuggestedUsers = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSuggestedUsers = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/auth/suggested", {withCredentials: true});
                if(res.data.success){
                    dispatch(setSuggestedUsers(res.data.users))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSuggestedUsers();
    },[]);
}
export default useSuggestedUsers;