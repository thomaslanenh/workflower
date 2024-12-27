
import {useEffect, useState} from 'react';
import {Field, Form, Formik, useFormikContext} from 'formik';
import "./WorkflowFlow.css"
import {useWorkflowerStore} from '../WorkflowerStore.jsx'
import {Hearts} from "react-loader-spinner";
import axios from "axios";

const GeneratingCode = () => {

    const dispatch = useWorkflowerStore(state => state.dispatch)

    const [loading, setLoading] = useState(true);

    const payload_body = {
        workflow_type: useWorkflowerStore(state => state.workflow_type),
        needed_functions: useWorkflowerStore(state => state.needed_functions),
        api_key: useWorkflowerStore(state => state.api_key),
        properties: useWorkflowerStore(state => state.properties),
        custom_object_id: useWorkflowerStore(state=>state.custom_object_id)
    }
//
    const generated_code = useWorkflowerStore(state => state.generated_code)

    const quotes = [
        "Beauty is not in the face; beauty is a light in the heart. — Khalil Gibran",
        "Happiness is not something ready made. It comes from your own actions. — Dalai Lama",
        "The best way to cheer yourself up is to try to cheer somebody else up. — Mark Twain",
        "Beauty begins the moment you decide to be yourself. — Coco Chanel",
        "For every minute you are angry you lose sixty seconds of happiness. — Ralph Waldo Emerson",
        "True beauty is when someone radiates that they like themselves. — Amy Poehler",
        "The happiness of your life depends upon the quality of your thoughts. — Marcus Aurelius",
        "Happiness is a direction, not a place. — Sydney J. Harris",
        "A thing of beauty is a joy forever. — John Keats",
        "Happiness depends upon ourselves. — Aristotle",
        "The beauty you see in me is a reflection of you. — Rumi",
        "Happiness is not by chance, but by choice. — Jim Rohn",
        "There is no cosmetic for beauty like happiness. — Maria Mitchell",
        "Beauty is power; a smile is its sword. — John Ray",
        "Do not wait for leaders; do it alone, person to person. — Mother Teresa",
        "A smile is the best makeup any girl can wear. — Marilyn Monroe",
        "The most beautiful things in the world cannot be seen or touched, they are felt with the heart. — Helen Keller",
        "Happiness is the highest good. — Aristotle",
        "Everything has beauty, but not everyone sees it. — Confucius",
        "Happiness is not a goal; it is a by-product. — Eleanor Roosevelt",
        "Love is composed of a single soul inhabiting two bodies. — Aristotle",
        "Love is the only reality, and it is not a mere sentiment. It is the ultimate truth that lies at the heart of creation. — Rabindranath Tagore",
        "In the end, we will remember not the words of our enemies, but the silence of our friends. — Martin Luther King Jr.",
        "Where there is love, there is life. — Mahatma Gandhi",
        "Love is a many-splendored thing. — Paul Simon",
        "To love and be loved is to feel the sun from both sides. — David Viscott",
        "The best thing to hold onto in life is each other. — Audrey Hepburn",
        "You don’t love someone because they’re perfect, you love them in spite of the fact that they’re not. — Jodi Picoult",
        "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day. — Unknown",
        "Love is a friendship set to music. — Joseph Campbell",
        "Love is the flower you’ve got to let grow. — John Lennon",
        "We are most alive when we’re in love. — John Updike",
        "There is no remedy for love but to love more. — Henry David Thoreau",
        "Love is the greatest refreshment in life. — Pablo Picasso",
        "Love is the only thing that we can carry with us when we go, and it makes the end so easy. — Louisa May Alcott"
    ];

    const getCode = async () => {
        console.log(payload_body)

        let data = JSON.stringify(payload_body);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://damp-wave-52358-daf45bbe919b.herokuapp.com/generate-code',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'crossdomain': true
            },
            data: data
        };

        try {
            const get_code = await axios.request(config)
            console.log(get_code.data)
            dispatch({
                action: "set_generated_code",
                payload: {
                    generated_code: get_code.data
                }
            })
            setLoading(false)
        } catch (e) {
            console.log(e)
        }
    }


    useEffect( () => {
        getCode()
    }, [])

    return(
        <div style={{textAlign:"center", marginLeft: "auto", marginRight: "auto"}}>
            {loading &&
                <>
                    <Hearts
                        height="80"
                        width="80"
                        color="#eb34cf"
                        ariaLabel="hearts-loading"
                        wrapperStyle={{}}
                        wrapperClass="loadingSpinner"
                        visible={true}
                    />
                    <span style={{fontStyle: "italic", fontSize: 11}}>{quotes[Math.floor(Math.random() * quotes.length)]}</span>
                </>
            }
            {!loading &&
                <div style={{textAlign:"unset"}}>
                    <h3>Workflow Code:</h3>
                    <pre style={{textAlign: "left"}}>
                        {generated_code}
                    </pre>
            </div>}
        </div>
    )
}

export default GeneratingCode;