const {default: axios, all} = require("axios");
const { useState, useEffect } = require("react");

function useFetchData(apiEndPoint){
    const [alldata, setAlldata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        if(initialLoad){
            // set initialload to false to prevent the api call on subsequent renders
            setInitialLoad(false);
            setLoading(false); //set loading to false to show components initially
            return; //exit useefect
        }

        setLoading(true)

        const fetchAllData = async () => {
            try {
                const res = await axios.get(apiEndPoint);
                const alldata = res.data;
                setAlldata(alldata);
                setLoading(false);
            } catch (error){
                console.error('Error en el Fetching de datos del blog', error);
                setLoading(false);
            }
        };

        //fetch blog data onlu if apiendpoint exists
        if(apiEndPoint){
            fetchAllData();
        }
    }, [initialLoad, apiEndPoint]); //append on initialload and apiendpoint to trigger api call

    return {alldata, loading}

}

export default useFetchData;