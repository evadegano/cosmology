import { Formik, Form, Field } from 'formik'
import FormNav from './formNav'


export default function StepOne(props) {
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
                <div key={field.name}>
                  <h3>{field.name}</h3>
                  <Field name={field.name} />
                </div>
              )
            })}

            {props.prev && <button type='button'>Back</button>}

            <button type='submit'>Next</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}