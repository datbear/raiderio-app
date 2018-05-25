import React from 'react';



export default class Character extends React.Component{
    componentDidMount(){
        
    }

    removeCharacter(){
        this.props.removeCharacter(this.props.region, this.props.realm, this.props.name);
    }

    render(){
        return(
            <div className="row character">
                <div className="col-sm-3 text-center">
                    {this.props.region}
                </div>
                <div className="col-sm-4">
                    {this.props.name}
                </div>
                <div className="col-sm-4">
                    {this.props.realm}
                </div>
                <div className="col-sm-1">
                    <button className="btn btn-sm btn-danger" onClick={this.removeCharacter.bind(this)}><i class="fas fa-user-minus"></i></button>
                </div>
            </div>
        );
    }
}