import { Formik, Form, Field } from 'formik'
import FormNav from './formNav'
import styles from '../../styles/UserForm.module.css'


export default function FormLayout(props) {
  const handleSubmit = (values) => {
    const finalStep = props.currentStep === props.totalSteps - 1
    
    props.next(values, finalStep)
  }

  const handleChange = (event) => {
    const target = event.target

    props.setUserForm(prev => ({ ...prev, ...target.value}))
  }

  return (
    <div id={styles.userForm}>
      <FormNav />

      <main>
        <Formik >

          {() => (
            <Form>
              {props.fields.map(field => {
                return (
                  <div key={field.name}>
                    <h3>{field.name}</h3>
                    <Field type={field.type} name={field.name} />
                  </div>
                )
              })}

              {
                props.currentStep !== props.totalSteps - 1 
                ? <button type='submit'>Next</button>
                : <button type='submit'>Create account</button>
              }
            </Form>
          )}

        </Formik>
      </main>
      
    </div>
  )
}