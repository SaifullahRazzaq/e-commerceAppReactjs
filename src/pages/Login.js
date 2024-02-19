import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Input from "../components/Input";
import { useDispatch } from 'react-redux';
import { AuthMiddleware } from '../redux/Middlewares/AuthMiddleware';
import HeaderComp from '../components/AuthHeader'
import { loginFields } from "../config/form";
import FormAction from "../components/formAction";
import { AuthAction } from "../redux/Actions";
export default function LoginPage() {
    const fields = loginFields;
    let fieldsState = {};
    fields.forEach(field => fieldsState[field.id] = '');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginState, setLoginState] = useState(fieldsState);
    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value })
    }
    const handleSubmit = () => {
        // alert("heelo")
        // console.log("api call")
        // if (!loginState.email) {

        // }
        // else if (!loginState.password) {

        // }
        // else {
        // console.log(loginState)
        dispatch(AuthMiddleware.loginUser({ email: loginState.emailAddress, password: loginState?.password })).then((res) => {

            // console.log("user==>", res)
            dispatch(AuthAction.Signin(res?.data?.data))
            navigate('/', { replace: true });
        }).catch((error) => {

        })
        // }
    }

    return (
        <>
            <HeaderComp
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/"
            />
            <form className="mt-8 space-y-6">
                <div className="-space-y-px">
                    {
                        fields.map(field =>
                            <Input
                                key={field.id}
                                handleChange={handleChange}
                                value={loginState[field.id]}
                                labelText={field.labelText}
                                labelFor={field.labelFor}
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                isRequired={field.isRequired}
                                placeholder={field.placeholder}
                            />

                        )
                    }
                </div>


                {/* <div style={{ alignSelf: 'center' }}>
                    <button size='md' style={{ background: 'black', alignSelf: 'center' }} onClick={handleSubmit}>Login</button>

                </div> */}
                <FormAction handleSubmit={handleSubmit} text="Login" />

            </form>        </>
    )
}