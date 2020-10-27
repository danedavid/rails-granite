class TasksController < ApplicationController
  def index
    @tasks = Task.all
  end

  def new
    @task = Task.new
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      render status: :ok, json: { notice: "Task was succesfully created" }
    else
      errors = @task.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  private

  def task_params
    params.require(:task).permit(:description)
  end
end
