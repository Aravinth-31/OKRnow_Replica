require 'test_helper'

class Api::V1::FunctionsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_functions_index_url
    assert_response :success
  end

  test "should get create" do
    get api_v1_functions_create_url
    assert_response :success
  end

  test "should get show" do
    get api_v1_functions_show_url
    assert_response :success
  end

  test "should get destroy" do
    get api_v1_functions_destroy_url
    assert_response :success
  end

end
