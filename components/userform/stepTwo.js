import { Formik, Form, Field } from 'formik'


export default function StepTwo(props) {
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
          <p>Birthday</p>
          <Field name="birthday" />

          <button type='button' onClick={(values) => props.prev(values)}>Back</button>
          <button type='submit'>Next</button>
        </Form>
      )}
    </Formik>
  )
}