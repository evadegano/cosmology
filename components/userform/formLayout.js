import { Formik, Form, Field } from 'formik'
import FormNav from './formNav'


export default function FormLayout(props) {
  const handleSubmit = (values) => {
    const finalStep = props.currentStep === props.totalSteps - 1
    
    props.next(values, finalStep)
  }

  return (
    <div>
      <FormNav />

      <Formik
        initialValues={props.user}
        onSubmit={handleSubmit}
      >
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

            {props.currentStep !== 0 && <button type='button' onClick={(values) => props.prev(values)}>Back</button>}
            {
              props.currentStep !== props.totalSteps - 1 
              ? <button type='submit'>Next</button>
              : <button type='submit'>Create account</button>
            }
          </Form>
        )}
      </Formik>
    </div>
  )
}