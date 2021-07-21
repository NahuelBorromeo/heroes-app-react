import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { heroImages } from '../../helpers/heroImages';
import { getHeroById } from '../../selectors/getHeroById';

export const HeroScreen = ({ history }) => {

    //El useParams es un hook de react-router que extrae los params que se le envia
    const { heroeId } = useParams();

    const hero = useMemo(() => getHeroById( heroeId ), [ heroeId ])

    //Si el argumento que recibimos por el URL no es un heroe existente, redireccionamos al usuario a la pantalla principal
    if ( !hero ){
        return <Redirect to="/" />
    }

    const handleReturn = () => {

        history.goBack();

        switch (publisher) {
            case 'DC Comics':
                history.push('/dc');
                break;
        
            default:
                history.push('/');
                break;
        }
    }

    const {         
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = hero;

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img  
                    // src={ `../assets/heroes/${ heroeId }.jpg`} //desde public/assets
                    src={ heroImages(`./${ heroeId }.jpg`).default }
                    alt={ superhero }
                    className="img-thumbnail animate__bounceInLeft animate__animated"
                />
            </div>

            <div className="col-8">
                <h3>{ superhero }</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b> Alter ego: </b>{ alter_ego }</li>
                    <li className="list-group-item"><b> Publisher: </b>{ publisher }</li>
                    <li className="list-group-item"><b> First Appearance: </b>{ first_appearance }</li>
                </ul>

                <h5>Characters</h5>
                <p>{ characters }</p>

                <button 
                    className="btn btn-outline-info"
                    onClick={ handleReturn }
                >
                    Return
                </button>
            </div>
        </div>
    )
}
