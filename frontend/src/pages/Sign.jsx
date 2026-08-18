import { Form, Link, useActionData } from "react-router-dom"

export default function SignPage({ type }) {
    let button
    if (type === "login") {
        button = <button>Sign In</button>
    }
    else if (type === "register") {
        button = <button>Sign up</button>
    }
    let loginData = useActionData();
    console.log(loginData);

    return <div className="sign-form">
        <div id="details-box1">
            <div id="details-data1">
                <Form method="post">
                    <label>Email:</label>
                    <input type="email" name="email" />

                    <label>Password</label>
                    <input type="password" name="password" />
                    {button}
                </Form>
                {type === "login" && <Link to="/register">create an account instead</Link>}
                {type === "register" && <Link to="/login">Login with account instead</Link>}

            </div>
        </div>
    </div>
}