import { Formik, Form, Field } from 'formik'
import FormNav from './formNav'


export default function FormLayout(props) {
  const handleSubmit = (values) => {
    props.next(values)
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
                <div key={field}>
                  <h3>{field}</h3>
                  <Field name={field} />
                </div>
              )
            })}

            {props.currentStep !== 0 && <button type='button' onClick={(values) => props.prev(values)}>Back</button>}
            {props.currentStep !== props.totalSteps - 1 && <button type='submit'>Next</button>}
          </Form>
        )}
      </Formik>
    </div>
  )
}