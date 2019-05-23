import React, { Component } from 'react';
import { Card, CardContent, Typography, Link } from '@material-ui/core';


class Cards extends Component{

    
    render(){

        const rows = this.props.rows;
        // console.log(rows);

        return (
          <div>
            {rows.map(r=>{
              return (<Card style={{margin:5}} key={r.title}>
                <CardContent>
                  <Link href={"https://github.com" + r.link}><Typography variant="h5" component="h2">{r.title}</Typography></Link>
                  <Typography component="p">{r.description}</Typography>
                </CardContent>
                <CardContent>
                  <Typography>Language: {r.language}</Typography>
                  <Typography>Stars: {r.stars || "0"}</Typography>
                  <Typography>Tags: {r.tags.join(", ") || "No tag"}</Typography>
                </CardContent>
              </Card>)
            })}
          </div>      
        );
    }
}

export default Cards;