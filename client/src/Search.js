import axios from 'axios';
import AdBox from './AdBox';
import { useState, useEffect } from 'react'
import './Search.css'

function Search() {
    const [inputState, setInputState] = useState({ keyword: '' });
    const [adData, setAdData] = useState();

    useEffect(() => {
        if (inputState.keyword) {
            const getData = async () => {
                try {
                    const resp = await axios.post('/ads', { ...inputState })
                    setAdData(resp.data)
                } catch (error) {
                    console.log(error)
                }
            }
            getData();
        }

    }, [inputState]);

    const handleInputValue = (e) => {
        setInputState({ ...inputState, keyword: e.target.value });
    };


    return (
        <section>
            <div className="search__box__wpr" >
                <input className="search__field" type="search" placeholder="Enter the Keyword." onChange={(e) => handleInputValue(e)} />
            </div>

            <div className='ads__container'>
                {adData && adData ? adData.map((item, id) =>  <AdBox key={id} item={item}/> ) : ""}
            </div>

        </section>
    );
}

export default Search;