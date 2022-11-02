import React from 'react';

const PagingNavigation = (props) => {
    return (
        <div className="d-flex justify-between w-100 mt-2">
            { props.hasPrev && (
                <div 
                    className="btn" 
                    onClick={props.prevPage}
                >
                    Prethodna strana
                </div>
            )}

            { props.hasNext && (
                <div 
                    className="btn ml-auto" 
                    onClick={props.nextPage}
                >
                    Slijedeća strana
                </div>
            )}
        </div>
    );
}

export default PagingNavigation;
