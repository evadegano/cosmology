export default function StepSignup({ userForm, setUserForm }) {
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
      <form>
        <label>Your name</label>
        <input type='text' name='name' value={userForm.name} placeholder='' onChange={handleChange} />

        <label>Your email address</label>
        <input type='email' name='email' value={userForm.email} placeholder='' onChange={handleChange} />

        <label>Your password</label>
        <input type='password' name='password' value={userForm.password} placeholder='' onChange={handleChange} />

        <label>Confirm your password</label>
        <input type='password' name='passwordConfirm' value={userForm.passwordConfirm} placeholder='' onChange={handleChange} />
      </form>
    </div>
  )
}