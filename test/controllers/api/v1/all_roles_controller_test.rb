require 'test_helper'

class Api::V1::AllRolesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_all_roles_index_url
    assert_response :success
  end

end
