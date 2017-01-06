import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Formsy from 'formsy-react'
import {FormsyText} from 'formsy-material-ui/lib'

class LoginForm extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            canSubmit: false
        }

        this.enableSubmitButton = this.enableSubmitButton.bind(this)
        this.disableSubmitButton = this.disableSubmitButton.bind(this)
    }

    enableSubmitButton () {
        this.setState({canSubmit: true})
    }

    disableSubmitButton () {
        this.setState({canSubmit: false})
    }

    render () {
        return <Formsy.Form
            onValid={this.enableSubmitButton}
            onInvalid={this.disableSubmitButton}
            onValidSubmit={this.props.onSubmit}>

            <FormsyText
                fullWidth={true}
                name="username"
                type="email"
                validations="isEmail"
                validationError="Wrong format"
                floatingLabelText="Email"
                required
            />

            <FormsyText
                fullWidth={true}
                name="password"
                floatingLabelText="Password"
                required
            />

            <RaisedButton fullWidth={true} primary={true} type="submit" label="Submit" disabled={!this.state.canSubmit}/>
        </Formsy.Form>
    }
}

LoginForm.propTypes = {
    onSubmit: React.PropTypes.func.isRequired
}

export default LoginForm