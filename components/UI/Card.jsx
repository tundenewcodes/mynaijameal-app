import style from '../../styles/Card.module.css'
const Card = ( props ) => {
    return <div className={style.card}>{props.children}</div>
}

export default Card