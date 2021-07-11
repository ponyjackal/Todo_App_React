/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPencilAlt,
  faTrashAlt,
  faEye,
} from '@fortawesome/free-solid-svg-icons'
import { ListGroup, Button, Form } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import { updateTodo, deleteTodo } from '../store/slices/TodoSlice'

const Todo = ({ id, note, dueDate, completed, onToggle }) => {
  const dispatch = useDispatch()
  const [isEdit, setIsEdit] = useState(false)
  const [newNote, setNewNote] = useState(note)
  const [newDueDate, setNewDueDate] = useState(new Date(dueDate).toDateString())

  const updateTodoTrigger = useCallback(
    (todo) => dispatch(updateTodo(todo)),
    [dispatch],
  )
  const deleteTodoTrigger = useCallback(
    (todoId) => dispatch(deleteTodo(todoId)),
    [dispatch],
  )

  const onEdit = () => {
    setIsEdit(true)
  }
  const onNoteChange = (event) => {
    setNewNote(event.target.value)
  }
  const onSave = () => {
    setIsEdit(false)
    updateTodoTrigger({ id, note: newNote, completed, dueDate: newDueDate })
  }
  const onCancel = () => {
    setIsEdit(false)
  }
  const onDelete = () => {
    deleteTodoTrigger(id)
  }
  return (
    <ListGroup.Item key={id} className="todo-container">
      <Form.Control
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
      />
      {!isEdit ? (
        <Form.Label className={completed ? 'completed-todo' : ''}>
          {note}
        </Form.Label>
      ) : (
        <div className="todo-input-group">
          <Form.Control type="text" value={newNote} onChange={onNoteChange} />
          <DatePicker
            selected={new Date(newDueDate)}
            onChange={(date) => setNewDueDate(date.toDateString())}
          />
        </div>
      )}
      {!isEdit ? (
        <div className="todo-actions">
          <FontAwesomeIcon icon={faEye} />
          <FontAwesomeIcon icon={faPencilAlt} onClick={onEdit} />
          <FontAwesomeIcon icon={faTrashAlt} onClick={onDelete} />
        </div>
      ) : (
        // eslint-disable-next-line react/button-has-type
        <div className="todo-input-group">
          <Button onClick={onSave}>Save</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      )}
    </ListGroup.Item>
  )
}

Todo.propTypes = {
  id: PropTypes.number,
  note: PropTypes.string,
  dueDate: PropTypes.string,
  completed: PropTypes.bool,
  onToggle: PropTypes.func,
}

export default Todo
