import { useState } from "react";
import { Form, useActionData } from "react-router-dom"

export default function SignPage() {
    let data = useActionData()
    console.log(data);

    return <div className="sign-form">
        <div id="details-box1">
            <div id="details-data1">

                <Form method="post">
                    <label>Email:</label>
                    <input type="email" name="email" />

                    <label>Password</label>
                    <input type="password" name="password" />
                    <button>Sign In</button>
                    {data === "Invalid credentials" && <p>Invalid credentials</p>}

                </Form>

            </div>
        </div>
    </div>
}