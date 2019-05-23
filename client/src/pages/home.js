import React, { Component } from 'react';
import axios from "axios";  
import TextField from '@material-ui/core/TextField';
import Cards from '../components/cards';
import { Button } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';

class Home extends Component {
    state = {
        search:"",
        loading:false,
        rows:[]
    };

    componentWillMount() {
        // console.log(this.state.rows, this.state.rows.length);
    }

    handleKeys(e){
        if(e.key=="Enter")
            this.search();
    }

    search(){
        this.setState({loading:true, rows:[]});
        axios.post('/search?text='+this.state.search).then(resp=>{
            // console.log(resp.data)
            this.setState({loading:false, rows:resp.data.data});
        }).catch(err=>{
            console.log(err);
            this.setState({loading:false});
        });
    }

    render() {
        return ( 
            <div>  
                <div style={{marginLeft:"auto", marginRight:"auto", marginTop:20, padding:20, maxWidth:600}}>
                
                <TextField type="text" fullWidth placeholder="Type a repository name, description or tags" onKeyPress={e=>this.handleKeys(e)} onChange={e=>{this.setState({search:e.target.value})}} value={this.state.search} />
                <Button color="primary" onClick={e=>this.search()}>Search</Button>
                
                <br />

                <Fade in={this.state.loading}>
                    <LinearProgress />
                </Fade>

                <br/>

                <Slide direction="up" in={this.state.rows.length!==0} mountOnEnter unmountOnExit>
                    <Cards rows={this.state.rows} />
                </Slide>

                </div>

            </div>
        );
    }
}

export default Home;