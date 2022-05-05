import { Formik, Form, Field } from 'formik'


export default function StepOne(props) {
  const handleSubmit = (values) => {
    props.next(values)
  }
  return (
    <Formik
      initialValues={props.user}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <p>Goals</p>
          <Field name="goals" />

          <button type='submit'>Next</button>
        </Form>
      )}
    </Formik>
  )
}