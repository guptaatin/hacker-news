import React from 'react'

const Records = ({ data }) => {

    return (
        <>
            {data.map(i => (
                <div className='news-wrap'>
                    <div className='news-first'><strong>{i.title}</strong>&nbsp;({i.url})</div>
                    <div className='news-second'>{i.points} points | {i.author} | {i.num_comments}</div>
                </div>
            ))}
        </>
        // <table className="table">
        //     <thead>
        //         <tr>
        //             <th scope='col'>ID</th>
        //             <th scope='col'>First Name</th>
        //             <th scope='col'>Last Name</th>
        //             <th scope='col'>City</th>

        //         </tr>
        //     </thead>
        //     <tbody>
        //         {data.map(item => (
        //             <tr>
        //                 <td>{item.id} </td>
        //                 <td>{item.first_name} </td>
        //                 <td>{item.last_name} </td>
        //                 <td>{item.city} </td>
        //             </tr>
        //         ))}
        //     </tbody>
        // </table>
    )
}

export default Records  