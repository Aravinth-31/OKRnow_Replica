require 'test_helper'

class Api::V1::MasterdataControllerTest < ActionDispatch::IntegrationTest
  test "should get update" do
    get api_v1_masterdata_update_url
    assert_response :success
  end

end
