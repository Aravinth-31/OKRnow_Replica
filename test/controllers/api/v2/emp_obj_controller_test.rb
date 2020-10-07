require 'test_helper'

class Api::V2::EmpObjControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v2_emp_obj_index_url
    assert_response :success
  end

end
