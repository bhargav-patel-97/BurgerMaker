import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
 
        state = {
            error: null
        }

        componentDidMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, err => {
                this.setState({ error: err });
                // return res;
            });
        }

        // componentWillUnmount() {
        //     console.log('Will Unmount');
        //     axios.interceptors.request.eject(this.reqInterceptor);
        //     axios.interceptors.response.eject(this.resInterceptor);
        // }

        errorHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorHandler}>
                            {this.state.error ? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }      
    } 
}

export default withErrorHandler;