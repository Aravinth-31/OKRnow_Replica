require 'test_helper'

class Api::V1::LoginControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_login_index_url
    assert_response :success
  end

  test "should get create" do
    get api_v1_login_create_url
    assert_response :success
  end

  test "should get show" do
    get api_v1_login_show_url
    assert_response :success
  end

  test "should get destroy" do
    get api_v1_login_destroy_url
    assert_response :success
  end

end
