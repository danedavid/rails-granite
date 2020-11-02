require "test_helper"

class TaskTest < ActiveSupport::TestCase
  def test_is_instance_of_task
    task = Task.new

    # See if object task actually belongs to Task
    assert task.is_a?(Task)
  end


  def test_not_instance_of_user
    task = Task.new
    assert_not task.is_a?(User)
  end

  def test_value_of_description_assigned
    text = "Description assigned for testing"
    task = Task.new(description: text)
    assert_equal task.description, text
  end

  def test_value_created_at
    task = Task.new(description: "This is a test task")
    assert_nil task.created_at

    task.save!
    assert_not_nil task.created_at
  end

  def test_error_raised
    assert_raises ActiveRecord::RecordNotFound do
      Task.find(SecureRandom.uuid)
    end
  end

  def test_count_of_number_of_tasks
    assert_difference ->{Task.count}, 2 do
      Task.create!(description: "Creating a task through test")
      Task.create!(description: "Creating another task through test")
    end
  end

  def setup
    Task.delete_all
  end

end
