@live
Feature: Live stream validation

  @desktop
  Scenario: Player visible
    Given I am on the Al Jazeera live page on desktop
    Then the livestream player should be visible

  @desktop
  Scenario: Switch button visible
    Given I am on the Al Jazeera live page on desktop
    Then the Switch Player button should be visible
