import React, { Component } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';


class Cards extends Component{

    
    render(){

        const rows = this.props.rows;
        // console.log(rows);

        return (
          <div>
            {rows.map(r=>{
              return (<Card style={{margin:5}} key={r.title}>
                <CardContent>
                  <Typography variant="h5" component="h2">{r.title}</Typography>
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