import './AdBox.css'

function AdBox({item}) {
    return (
        <div className='ad__box'>
            <span>
            <h1>{item?.companyData?.name}</h1>
            <h3>{item?.ad?.headline}</h3>
            <p>{item?.ad?.primaryText}</p>
            {item?.ad?.description &&
                <p>
                    {item?.ad?.description}
                </p>
            }
            </span>

            <a href={item?.companyData?.url}>{item?.ad?.cta}</a>

        </div>
    );
};

export default AdBox;