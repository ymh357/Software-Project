import {useState, useEffect} from 'react';

const url = './db/response.json';

export default function useFetch(options){
    //nos dira si esta cargando o ya ha terminado
    const [loading, setLoading] = useState(true);
    //en result se va a guardar el resultado de la solicitud http
    const [result, setResult] = useState(null);
    //en caso que suceda un error
    const [error, setError] = useState(null);

    useEffect(()=>{
        (async () =>{
            try {
                const res = await fetch(url, options);
                const json = await res.json();
                setResult(json);
                setLoading(false)
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        })();
        //la siguiente linea es para que en caso que la url cambie o la option,
        //el effect se vuelva a ejecutar automaticamente
    },[options, url]);

    return{loading, result, error};

}