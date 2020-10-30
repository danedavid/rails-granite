class TasksController < ApplicationController
  before_action :ensure_user_logged_in
  before_action :load_task, only: [:show, :edit, :update, :destroy]

  def index
    @tasks = policy_scope(Task)
  end

  def new
    @task = Task.new
  end

  def create
    @user = User.find(task_params[:user_id])
    @task = @user.tasks.new(task_params)
    authorize @task
    @task.creator_id = @current_user.id

    if @task.valid?
      @task.save
      render status: :ok, json: { notice: "Task was successfully created", id: @task.id }
    else
      render new
    end
  end

  def show
    @task = Task.find(params[:id])
    authorize @task
    @comments = @task.comments
  end

  def edit
    @task = Task.find(params[:id])
    authorize @task
    render
  end

  def update
    @task = Task.find(params[:id])
    authorize @task

    if @task.update_attributes(task_params)
      redirect_to @task
    end
  end

  def destroy
    @task = Task.find(params[:id])
    authorize @task
    @task.destroy
    redirect_to tasks_url
  end

  private

  def task_params
    params.require(:task).permit(:description, :user_id)
  end

  def load_task
    @task = Task.find(params[:id])
    rescue ActiveRecord::RecordNotFound => errors
      render json: { errors: errors }
  end
end
