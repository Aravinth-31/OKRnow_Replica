require 'test_helper'

class Api::V2::ObjectivesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v2_objectives_index_url
    assert_response :success
  end

end
