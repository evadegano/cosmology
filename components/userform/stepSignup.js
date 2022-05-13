import Link from "next/link"
import utilsStyles from '../../styles/utils.module.css'


export default function StepSignup({ userForm, setUserForm, birthchart }) {
  const handleSubmit = async (event) => {
    event.preventDefault()

    const user = {}
    
    // POST signup api
    const signupRes = await fetch('api/auth/signup', {
      method: 'POST',
      body: user,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const userData = await signupRes.json()

    // POST birthchart api
    const birthChartRes = await fetch(`api/user/${userData.id}/birthchart.js`, {
      method: 'POST',
      body: birthchart,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // redirect user to their profile
    
    console.log('Form submitted.', userData)
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    switch (name) {
      case 'name':
        setUserForm(prev => ({ ...prev, name: value }))
        break
      case 'email':
        setUserForm(prev => ({ ...prev, email: value }))
        break
      case 'password':
        setUserForm(prev => ({ ...prev, password: value }))
        break
      case 'passwordConfirm':
        setUserForm(prev => ({ ...prev, passwordConfirm: value }))
        break
      default:
        break
    }
  }

  return (
    <div>
      <h1>Save your results and get access to your curated content!</h1>

      <form onSubmit={handleSubmit}>
        <label>Your name</label>
        <input type='text' name='name' value={userForm.name} placeholder='' onChange={handleChange} required />

        <label>Your email address</label>
        <input type='email' name='email' value={userForm.email} placeholder='' onChange={handleChange} required />

        <label>Your password</label>
        <input type='password' name='password' value={userForm.password} placeholder='' onChange={handleChange} required />

        <label>Confirm your password</label>
        <input type='password' name='passwordConfirm' value={userForm.passwordConfirm} placeholder='' onChange={handleChange} required />

        <p>*We will never share or sell your data. You&rsquo;re welcome to read our <Link href='/privacy-policy'><a>Privacy Policy</a></Link> to learn more.</p>

        <button className={utilsStyles.mainBtn} onClick={next} type="submit">Save & create account</button>
      </form>
    </div>
  )
}